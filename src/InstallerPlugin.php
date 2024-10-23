<?php

namespace Metadrop\BackstopjsAddons;

use Composer\Composer;
use Composer\EventDispatcher\EventSubscriberInterface;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;
use Composer\Script\Event;
use Composer\Script\ScriptEvents;

/**
 * Composer scripts for the BackstopJS Addons during installation.
 */
class InstallerPlugin  implements PluginInterface, EventSubscriberInterface {

  public function activate(Composer $composer, IOInterface $io): void
  {
    // noop
  }

  public function deactivate(Composer $composer, IOInterface $io): void
  {
    // noop
  }

  public function uninstall(Composer $composer, IOInterface $io): void
  {
    // noop
  }


  public static function getSubscribedEvents()
  {
    return [
      ScriptEvents::POST_INSTALL_CMD => 'MoveFiles',
      ScriptEvents::POST_UPDATE_CMD => 'MoveFiles',
    ];
  }

  /**
   * Move the BackstopJS Addons files to the tests folder.
   *
   * @param \Composer\Script\Event $event
   *   The Composer event.
   */
  public function MoveFiles(Event $event) {
    $composer = $event->getComposer();

    // Source
    $source = $composer->getConfig()->get('vendor-dir') . '/metadrop/backstopjs-addons/addons';

    // Destination
    $root = $composer->getConfig()->get('vendor-dir') . '/..';

    $extra = $composer->getPackage()->getExtra();
    $backstop_addons_extras = $extra['backstop-addons'] ?? [];
    $destination = $backstop_addons_extras['destination'] ?? 'tests/backstopjs/common/libraries/backstopjs-addons';
    $destination = "{$root}/{$destination}";

    if (is_dir($destination)) {
      self::deleteDirectoryContents($destination);
    } else {
      mkdir($destination, 0755, TRUE);
    }

    self::copyFiles($source, $destination);
  }

  /**
   * Copy files from source to destination.
   *
   * @param string $source
   *   The source folder.
   * @param string $destination
   *   The destination folder.
   */
  private function copyFiles($source, $destination) {
    $files = scandir($source);
    foreach ($files as $file) {
      if ($file == '.' || $file == '..') {
        continue;
      }
      if (is_dir($source . '/' . $file)) {
        mkdir($destination . '/' . $file);
        self::copyFiles($source . '/' . $file, $destination . '/' . $file);
      }
      else {
        copy($source . '/' . $file, $destination . '/' . $file);
      }
    }
  }

  /**
   * Delete directory content.
   *
   * @param string $dir
   *   The destination folder.
   */
  private function deleteDirectoryContents($dir) {
    $files = array_diff(scandir($dir), array('.', '..'));
    foreach ($files as $file) {
      $filePath = $dir . '/' . $file;
      if (is_dir($filePath)) {
        self::deleteDirectoryContents($filePath);
        rmdir($filePath);
      } else {
        unlink($filePath);
      }
    }
  }

}